import React from 'react';
import mqtt, { Client, IClientOptions } from 'mqtt';

const ColorButton: React.FC = ({color}) => {
  const envoyercClr = () => {
    const options: IClientOptions = {
      username: 'groupe4',
      password: 'groupe4',
      port: 9001,
    };

    // en websocket car une page web ne prend pas en compte le "mqtt://""
    const mqttClient = mqtt.connect("ws://helhatechniquecharleroi.xyz", options);

    mqttClient.on("connect", () => {
      console.log("connected");

      // r:g:b
      switch (color) {
        case "red":
          mqttClient.publish(`/groupe4/evt/sif412_L1_in1`, "1");
          mqttClient.publish(`/groupe4/evt/sif412_L1_in2`, "0");
          mqttClient.publish(`/groupe4/evt/sif412_L1_in3`, "0");
          break;
        case "green":
          mqttClient.publish(`/groupe4/evt/sif412_L1_in1`, "0");
          mqttClient.publish(`/groupe4/evt/sif412_L1_in2`, "1");
          mqttClient.publish(`/groupe4/evt/sif412_L1_in3`, "0");
          break;
        case "yellow":
          mqttClient.publish(`/groupe4/evt/sif412_L1_in1`, "1");
          mqttClient.publish(`/groupe4/evt/sif412_L1_in2`, "1");
          mqttClient.publish(`/groupe4/evt/sif412_L1_in3`, "0");
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
    <button className="bg-[#64748b] hover:bg-[#1e293b] text-white py-2 px-4 rounded-full" onClick={envoyercClr}>Envoyer "{color}"</button>
  );
};

export default ColorButton;
