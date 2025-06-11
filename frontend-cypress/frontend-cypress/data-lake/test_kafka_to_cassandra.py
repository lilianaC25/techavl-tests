from kafka import KafkaProducer
from cassandra.cluster import Cluster
import time
import json

# Enviar mensaje simulado a Kafka
producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda m: json.dumps(m).encode('utf-8')
)

mensaje = {"vehicleId": "123ABC", "lat": 40.41, "lng": -3.70}
producer.send('gps_topic', mensaje)
producer.flush()

# Esperar unos segundos para que Kafka lo procese
time.sleep(5)

# Conectarse a Cassandra y verificar que el dato se insertó
cluster = Cluster(['localhost'])
session = cluster.connect('techavl')  # keyspace 'techavl'

row = session.execute(
    "SELECT * FROM locations WHERE vehicleId = '123ABC'"
).one()

if row:
    print("Dato encontrado en Cassandra:", row)
else:
    print("El dato no fue encontrado.")
