import mqtt from "mqtt";
import { env } from "./env.mjs";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const mqttClient = mqtt.connect("mqtt://helhatechniquecharleroi.xyz", {
  username: "groupe4",
  password: "groupe4",
  port: 1883,
});

mqttClient.on("connect", () => {
  mqttClient.subscribe("/groupe4/#");
});

mqttClient.on("message", async (topic, message) => {
  topic = topic.replace("/groupe4/", "");
  console.log(topic, message.toString());

  await db.tags.upsert({
    where: {
      name: topic,
    },
    create: {
      name: topic,
      state: message.toString(),
      date: new Date(),
    },
    update: {
      state: message.toString(),
      date: new Date(),
    },
  });
});