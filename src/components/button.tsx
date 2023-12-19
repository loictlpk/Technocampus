// HelloButton.tsx
import React from 'react';
import mqtt, { Client, IClientOptions } from 'mqtt';

interface HelloButtonProps {
  message: string;
}

const HelloButton: React.FC<HelloButtonProps> = ({ message }) => {
  const envoyerHello = () => {
    const options: IClientOptions = {
      clientId: 'clientId_' + Math.random().toString(16).substr(2, 8),
      username: 'groupe4',
      password: 'groupe4',
      port: 9001,
    };

    const client = mqtt.connect("ws://helhatechniquecharleroi.xyz", options);

    // Custom topic based on the input message
    const topic = `/groupe4/${message.toLowerCase().replace(/\s/g, "_")}`;

    client.on("connect", () => {
      console.log("connected");

      // Custom message based on the input message
      const customMessage = `Custom message for: ${message}`;

      // Publish the custom message on the custom topic
      client.publish(topic, customMessage, (err) => {
        if (err) {
          console.error("Erreur lors de la publication du message", err);
        } else {
          console.log(`Message '${customMessage}' publié sur le topic ${topic}`);
        }

        // Disconnect the client after publishing the message
        client.end();
      });
    });

    client.on("error", (err) => {
      console.error("Erreur de connexion MQTT", err);
    });
  };

  return (
    <button onClick={envoyerHello}>Envoyer "{message}"</button>
  );
};

export default HelloButton;
