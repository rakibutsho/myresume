import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import profile from "@/assets/profille.png";

function ProfileCard() {
  return (
    <div className="w-fit bg-white">
      <div className="p-4">
        <Image src={profile} alt="profile" className="w-full" />
      </div>

      <div>
        <h2 className="text-4xl font-serif text-black">Md. Rakibul Islam</h2>
      </div>
    </div>
  );
}

export default ProfileCard;
