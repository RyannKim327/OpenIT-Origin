from django.db import models

# Create your models here.


class BaseAuthModel(models.Model):
    order = "id"

    class Meta:
        abstract = True

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)

        if not hasattr(cls, "Meta"):

            class Meta:
                pass

            cls.Meta = Meta

        if not hasattr(cls.Meta, "ordering"):
            cls.Meta.ordering = (f"{cls.order}",)
