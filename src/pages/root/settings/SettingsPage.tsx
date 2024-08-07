import ThemeToggleTab from "@/components/settings/ThemeToggleTab";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

type SettingsTabOption = "appearance" | "notifications" | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabOption>("appearance");

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as SettingsTabOption)}
      className="w-[400px]"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="appearance" className="space-y-2">
        <Card>
          <CardHeader>
            <CardDescription >
              Change the general appearance of the app here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
                <Label htmlFor="theme">Theme</Label>
                <ThemeToggleTab />

            </div>
           
          </CardContent>
          {/* <CardFooter>
            <Button>Save</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
      <TabsContent value="notifications" className="space-y-2">
        <Card>
            <CardHeader>
                <CardDescription>
                Update your notification settings here.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                
            </CardContent>
            {/* <CardFooter>
                <Button>Save</Button>
            </CardFooter> */}
        </Card>
      </TabsContent>
      <TabsContent value="security" className="space-y-2">
        <Card>
            <CardHeader>
                <CardDescription>
                Manage your security settings here.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                
            </CardContent>
            {/* <CardFooter>
                <Button>Save</Button>
            </CardFooter> */}
        </Card>
      </TabsContent>
    </Tabs>
  );
}
