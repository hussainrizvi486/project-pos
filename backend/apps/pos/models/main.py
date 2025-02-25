import uuid
from django.db import models
from django.utils import timezone


class BaseModel(models.Model):
    id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4, editable=False
    )
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(default=timezone.now, editable=False)

    class Meta:
        abstract = True


class UOM(models.Model):
    name = models.CharField(max_length=255)
    conversion_factor = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return self.name
