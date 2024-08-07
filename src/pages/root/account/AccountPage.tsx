import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAccount } from "@/provider/AccountProvider";
import { ProfileForm } from "./ProfileForm";

type AccountTabOption = "profile" | "plan" | "billing";

export default function AccountPage() {
  const { profile } = useAccount();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<AccountTabOption>("profile");

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash === "plan" || hash === "billing") {
      setActiveTab(hash as AccountTabOption);
    } else {
      setActiveTab("profile");
    }
  }, [location.hash]);

  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as AccountTabOption)} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="plan">Plan</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="space-y-2">
        {profile && <ProfileForm profile={profile} />}
      </TabsContent>
      <TabsContent value="plan" className="space-y-2">
        <Card>
        <CardHeader>
            <CardTitle>Free Beta</CardTitle>
            <CardDescription>All our services are currently free while we are testing our platform.</CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="billing" className="space-y-2">
        <Card>
          <CardHeader>
            <CardDescription>Update your billing information here.</CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
