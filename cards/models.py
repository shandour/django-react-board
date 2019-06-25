import uuid
import enum

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class TaskSatuses(enum.Enum):
    TO_DO = 1
    IN_PROGRESS = 2
    DONE = 3

    @classmethod
    def choices(cls):
        return [
            (cls.TO_DO.value, 'To Do'),
            (cls.IN_PROGRESS.value, 'In Progress'),
            (cls.DONE.value, 'Done'),
        ]


class Card(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    text = models.TextField()
    assignee = models.ForeignKey(
        User,
        related_name='cards',
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    last_edited = models.DateTimeField(auto_now=True)
    status = models.SmallIntegerField(choices=TaskSatuses.choices())
