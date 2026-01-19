import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import profile from "@/assets/profille.png";

function ProfileCard() {
  return (
    <Card className="w-fit">
      <Image src={profile} alt="profile" />

	  <div>
		<h2 className="text-4xl font-serif">Md. Rakibul Islam</h2>
	  </div>
    </Card>
  );
}

export default ProfileCard;
