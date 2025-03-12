import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

const CyberSecurityGame = () => {
  const [scene, setScene] = useState("menu");
  const [playerHP, setPlayerHP] = useState(1000);
  const [message, setMessage] = useState("Welcome to the Cyber Security Battle!");
  const [password, setPassword] = useState(""); // 儲存密碼
  const [passwordStrength, setPasswordStrength] = useState(""); // 密碼強度

  const startScenario = (scenario) => {
    if (scenario === "password") {
      setPassword(""); // 清空密碼
    }
    setScene(scenario);
    setMessage("Please enter your password.");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // 密碼強度檢測邏輯
  const checkPasswordStrength = (pwd) => {
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumbers = /\d/.test(pwd);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    if (pwd.length >= 8 && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars) {
      return "strong";
    } else if (pwd.length >= 6 && (hasUpperCase || hasLowerCase) && (hasNumbers || hasSpecialChars)) {
      return "medium";
    } else {
      return "weak";
    }
  };

  const handleSubmitPassword = () => {
    const strength = checkPasswordStrength(password);
    setPasswordStrength(strength);

    let newHP = playerHP;
    let resultMessage = "";

    if (strength === "strong") {
      resultMessage = "Great! Your password is strong. +20% Defense!";
    } else if (strength === "medium") {
      resultMessage = "Your password is medium. Consider improving it.";
    } else {
      newHP -= 300;
      resultMessage = "Weak password! You lost 300 HP due to hacking.";
    }

    setPlayerHP(newHP);
    setMessage(resultMessage);
    setScene("menu");
  };

  const handleChoice = (choice) => {
    let newHP = playerHP;
    let resultMessage = "";

    switch (scene) {
      case "password":
        if (choice === "strong") {
          resultMessage = "Great! Your password is strong. +20% Defense!";
        } else {
          newHP -= 300;
          resultMessage = "Weak password! You lost 300 HP due to hacking.";
        }
        break;
      case "2fa":
        if (choice === "enable") {
          resultMessage = "2FA enabled! You gain 500 HP protection.";
          newHP += 500;
        } else {
          newHP -= 400;
          resultMessage = "No 2FA? Your account was hacked! -400 HP.";
        }
        break;
      case "backup":
        if (choice === "auto") {
          resultMessage = "Backup saved you! Data restored!";
        } else {
          newHP -= 700;
          resultMessage = "No backup? Ransomware destroyed your data! -700 HP.";
        }
        break;
      case "public_wifi":
        if (choice === "vpn") {
          resultMessage = "VPN protected you! Attack damage reduced.";
        } else {
          newHP -= 400;
          resultMessage = "Public Wi-Fi attack! -400 HP & lost economy.";
        }
        break;
      case "update":
        if (choice === "now") {
          resultMessage = "System updated! Security improved.";
        } else {
          newHP -= 500;
          resultMessage = "Delayed update? You got hacked! -500 HP.";
        }
        break;
      default:
        resultMessage = "Invalid choice.";
    }

    setPlayerHP(newHP);
    setMessage(resultMessage);
    setScene("menu");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold">Cyber Security Battle</h1>
      <Card className="w-96 p-4 my-4">
        <CardContent>
          <p className="text-center">{message}</p>
          <p className="text-center">Player HP: {playerHP}</p>
        </CardContent>
      </Card>
      {scene === "menu" ? (
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => startScenario("password")}>Set Password</Button>
          <Button onClick={() => startScenario("2fa")}>Enable 2FA</Button>
          <Button onClick={() => startScenario("backup")}>Backup Decision</Button>
          <Button onClick={() => startScenario("public_wifi")}>Use Public Wi-Fi</Button>
          <Button onClick={() => startScenario("update")}>Update Software</Button>
        </div>
      ) : scene === "password" ? (
        <div className="grid grid-cols-1 gap-4 mt-4">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            className="border p-2"
          />
          <Button onClick={handleSubmitPassword}>Submit</Button>
        </div>
      ) : scene === "2fa" ? (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button onClick={() => handleChoice("enable")}>Enable 2FA</Button>
          <Button onClick={() => handleChoice("disable")}>Disable 2FA</Button>
        </div>
      ) : scene === "backup" ? (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button onClick={() => handleChoice("auto")}>Auto Backup</Button>
          <Button onClick={() => handleChoice("manual")}>Manual Backup</Button>
        </div>
      ) : scene === "public_wifi" ? (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button onClick={() => handleChoice("vpn")}>Use VPN</Button>
          <Button onClick={() => handleChoice("no_vpn")}>No VPN</Button>
        </div>
      ) : scene === "update" ? (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button onClick={() => handleChoice("now")}>Update Now</Button>
          <Button onClick={() => handleChoice("later")}>Update Later</Button>
        </div>
      ) : null}

    </div>
  );
};

export default CyberSecurityGame;
