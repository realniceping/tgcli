require("dotenv").config();
import {Api, TelegramClient} from "telegram";
import { StringSession } from "telegram/sessions";

const input = require("input")
import fs from "fs";

const apiId = 23747503;
const apiHash = "130a7bdb859f75e66eeffe1cd84aed59";

const session = fs.readFileSync("./session.txt").toString();
const stringSession = new StringSession(session); // fill this later with the value from session.save()

(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });
  console.log("You should now be connected.");
  const session: any = client.session.save()
  if(session != ''){
      fs.writeFile("./session.txt", session, (error) => {
        if(error) process.exit();
        console.log("session saved")
    })
  }
  await client.sendMessage("me", { message: "Hello!" });

})();