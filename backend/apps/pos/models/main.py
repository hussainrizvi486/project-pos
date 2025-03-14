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


class UOM(BaseModel):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
