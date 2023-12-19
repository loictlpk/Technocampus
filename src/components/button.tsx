// HelloButton.tsx
import React from 'react';
import mqtt from 'mqtt';

const HelloButton: React.FC = () => {
  const envoyerHello = () => {
    const client =  mqtt.connect("ws://helhatechniquecharleroi.xyz", {
      username: "groupe4",
      password: "groupe4",
      port: 9001,
    });

    const message = 'hello';
    const topic = '/groupe4/test';

    client.on("connect",() => {
      console.log("connected");
      
    })

      client?.publish(topic, message);

    // Publier le message sur le topic
    // client.publish(topic, message);

    // alert('Message "hello" envoyé sur le topic test.');

    // N'oubliez pas de fermer la connexion MQTT après utilisation
    client.end();
  };

  return (
    <button onClick={envoyerHello}>Envoyer "hello"</button>
  );
};

export default HelloButton;
