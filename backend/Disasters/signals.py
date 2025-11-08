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

    users = User.objects.all()

    # check if theres a user
    if users:
        nearby_users = []
        for user in users:
            print(user)
            # check if user has prefered location range
            if user.preference.location_range:
            # filter by distance with applied prefered location_range
                distance = haversine(float(user.latitude), float(user.longitude), float(instance.latitude), float(instance.longitude))
                if distance < nearby:
                    nearby_users.append(user)

            # check if user has prefered prefered magnitude_range
            if user.preference.magnitude_range:
                if user.preference.magnitude_range > instance.magnitude:
                    nearby_users.append(user)

            # check if user has prefered alert types
            alrt_type = ""

            if instance.magnitude < 3.0:
                alrt_type = "minor"
            elif instance.magnitude > 3.0 and instance.magnitude <= 4.5:
                alrt_type = "moderate"
            elif instance.magnitude > 4.5 and instance.magnitude <= 6.0:
                alrt_type = "strong"
            elif instance.magnitude > 6:
                alrt_type = "major"
            
            if user.preference.alert_types:
                if user.preference.alert_types == alrt_type:
                    nearby_users.append(user)

        # send notificaiton to all nearby users
        for user in nearby_users:
            notif = Notification.objects.create(
                to=user,
                content=f"Disaster with {instance.magnitude} is recorded, be cautios"
            )

            print(f"SENT NOTIFICAITON TO {user.email}")






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


