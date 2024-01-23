from django.db import models
from django.conf import settings

# Create your models here.


class Prediction(models.Model):
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL,
                               related_name='doctor',
                               on_delete=models.CASCADE)
    patient_name = models.CharField(max_length=50)
    patient_id = models.CharField(max_length=50)
    audio = models.FileField(upload_to='audio/')
    prediction = models.TextField(blank=True)
    is_positive = models.BooleanField(default=False)

    def __str__(self):
        return self.patient_name
