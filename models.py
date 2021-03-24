
from datetime import datetime
from mongoengine import *
import mongoengine_goodjson as gj
from mongoengine.fields import (
    DateTimeField,
    EmbeddedDocumentField,
    ListField,
    ReferenceField,
    StringField,
    BooleanField,
    IntField,
    FloatField,
    PointField
)


class SensorData(gj.Document):
    meta = {"collection": "sensor_data"}
    meta = {'db_alias': 'db1'}

    collect_time = DateTimeField(default=datetime.utcnow)
    temperature = FloatField()
    humidity = FloatField()
    light = IntField()
