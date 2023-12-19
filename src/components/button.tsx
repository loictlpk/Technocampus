// HelloButton.tsx
import React from 'react';
import mqtt, { Client, IClientOptions } from 'mqtt';

const HelloButton: React.FC = ({color}) => {
  const envoyerHello = () => {
    const options: IClientOptions = {
      username: 'groupe4',
      password: 'groupe4',
      port: 9001,
    };

    const mqttClient = mqtt.connect("ws://helhatechniquecharleroi.xyz", options);

    mqttClient.on("connect", () => {
      console.log("connected");

      
      switch (color) {
        case "red":
          mqttClient.publish(`/groupe4/evt/sif412_L1_in1`, "0");
          mqttClient.publish(`/groupe4/evt/sif412_L1_in2`, "1");
          mqttClient.publish(`/groupe4/evt/sif412_L1_in3`, "0");
          break;
        case "green":
          mqttClient.publish(`/groupe4/evt/sif412_L1_in1`, "0");
          mqttClient.publish(`/groupe4/evt/sif412_L1_in2`, "0");
          mqttClient.publish(`/groupe4/evt/sif412_L1_in3`, "1");
          break;
        case "yellow":
          mqttClient.publish(`/groupe4/evt/sif412_L1_in1`, "0");
          mqttClient.publish(`/groupe4/evt/sif412_L1_in2`, "1");
          mqttClient.publish(`/groupe4/evt/sif412_L1_in3`, "1");
          break;
        case "white":
          mqttClient.publish(`/groupe4/evt/sif412_L1_in1`, "1");
          mqttClient.publish(`/groupe4/evt/sif412_L1_in2`, "1");
          mqttClient.publish(`/groupe4/evt/sif412_L1_in3`, "1");
          break;
        default:
          mqttClient.publish(`/groupe4/evt/sif412_L1_in1`, "0");
          mqttClient.publish(`/groupe4/evt/sif412_L1_in2`, "0");
          mqttClient.publish(`/groupe4/evt/sif412_L1_in3`, "0");
          break;
      }

       mqttClient.end();
      });
  };

  return (
    <button onClick={envoyerHello}>Envoyer "{color}"</button>
  );
};

export default HelloButton;
