import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/provider/AuthProvider";

type AccountTabOption = "account" | "settings" | "billing";

export default function Account() {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<AccountTabOption>("account");

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash === "settings" || hash === "billing") {
      setActiveTab(hash as AccountTabOption);
    } else {
      setActiveTab("account");
    }
  }, [location.hash]);

  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as AccountTabOption)} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-2">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Make changes to your account information here. Click save when you're done.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Name" defaultValue={user?.user_metadata.full_name} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input disabled id="email" placeholder="Email" defaultValue={user?.user_metadata.email} />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="settings" className="space-y-2">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Update your account settings here. Click save when you're done.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="country">Country</Label>
              <Input id="country" placeholder="Namibia" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="language">Language</Label>
              <Input id="language" placeholder="English" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="billing" className="space-y-2">
        <Card>
          <CardHeader>
            <CardTitle>Free Beta Plan</CardTitle>
            <CardDescription>Our services are currently free during the beta period. </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
