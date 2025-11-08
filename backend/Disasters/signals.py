from django.db.models.signals import post_save
from django.dispatch import receiver
from Disasters.models import Disaster, Report
from Users.models import User
from Notifications.models import Notification
from utils.CalculateDistance import haversine

@receiver(post_save, sender=Disaster)
def new_disaster(sender, instance, created, **kwargs):
    if not created:
        return #this means if the instance is not a create then pass and return
    

    # define the range for the definition of nearby
    nearby = 20 #units in 20 kilometers

    # fetch all users
    users = User.objects.all()

    if len(users) > 0:
        try:
            for user in users:
                if user.latitude is None and user.longitude is None: return
                diss_lat = float(instance.latitude)
                diss_lng = float(instance.longitude)

                user_lat = float(user.latitude)
                user_lng = float(user.longitude)




                # variable to hold for preference
                near = nearby
                user_preference = user.preference

                # check if the user preferded alert types is within the magnitude
                magnitude_alert_types = ""
                magni = float(instance.magnitude)

                if magni <= 4.0:
                    magnitude_alert_types = "mild"
                elif magni > 4.0 and magni <= 6.0:
                    magnitude_alert_types = "priority"
                elif magni > 6.0 and magni <= 8.0:
                    magnitude_alert_types = "urgent"

                # if user alert type is not equal to type of disaster then pass this user
                if user_preference.alert_types:
                    if user_preference.alert_types != magnitude_alert_types:
                        pass



                if user_preference.magnitude_range:
                    # if magnitude is geater than the preferced range, then pass
                    if instance.magnitude > user_preference.magnitude_range:
                        # proceed
                        pass
                
                if user_preference.location_range:
                    near = float(user_preference.location_range)

                distance = haversine(user_lat, user_lng, diss_lat, diss_lng)
                print(distance)
                if distance < float(near):
                    print(distance)
                    # send notification to the user

                    notif = Notification.objects.create(
                        to=user,
                        content=f'Disaster with {instance.magnitude} is recorded, be cautios'
                    )
                    print(f"SENT NOTIFICATION TO {user.email}")
        except:
            print('An Exception occured')

    else:
        print('No User To Notify')

#     # calculate whose nearby
#     # send notification to users that is nearby
@receiver(post_save, sender=Report)
def new_report(sender, instance, created, **kwargs):
    if not created: return

    # get the admins
    admins = User.objects.filter(is_staff=True)

    if admins:
        for admin in admins:
            notif = Notification.objects.create(
                to=admin,
                content=f'{instance.reporter.first_name} reported {instance.description}'
            )
            print(f'Notified Staff {admin.first_name} for the report')


@receiver(post_save, sender=Report)
def report_verified(sender, instance, created, **kwargs):
    if created: return 

    # get the old instance of the report for comparision
    try:
        old_instance = Report.objects.get(pk=instance.id)
    except Report.DoesNotExist:
        print('Report does not exist')

    # check if the the same
    if old_instance.status == instance.status: return #to avoid cliking in duplicates, chekc if the prev stat and new stat is the same if yes dont proceed
    # sent notification
    # to user that reported it


    # maybe handle saving to disaster the after very8ing



    notif = Notification.objects.create(
        to=instance.reporter,
        content=f'Your report #{instance.id} - {instance.description} has been verified'
    )
    print(f'Sent notification to report {instance.report.first_name}')



    # send notif to the admin