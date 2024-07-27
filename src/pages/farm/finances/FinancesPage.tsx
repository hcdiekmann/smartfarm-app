import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const FinancePage = () => {
  return (
          <Tabs defaultValue="summary" className="w-full">
            <div className="flex mb-4">
              <TabsList className="grid w-[400px] grid-cols-3">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="summary" className="w-full">
              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                  <CardDescription>Overview of the farm's financials</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Expenses</h3>
                      <p className="text-2xl font-semibold">$500.00</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Income</h3>
                      <p className="text-2xl font-semibold">$2,000.00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expenses" className="w-full">
              <Card>
                <CardHeader>
                  <CardTitle>Expenses</CardTitle>
                  <CardDescription>Manage and track farm expenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Category</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2024-07-01</TableCell>
                        <TableCell>Fertilizer</TableCell>
                        <TableCell>$500.00</TableCell>
                        <TableCell>Supplies</TableCell>
                      </TableRow>
                      {/* Add more rows as needed */}
                    </TableBody>
                  </Table>
                  <Button className="mt-4">Add Expense</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="income" className="w-full">
              <Card>
                <CardHeader>
                  <CardTitle>Income</CardTitle>
                  <CardDescription>Manage and track farm revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Source</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2024-07-15</TableCell>
                        <TableCell>Crop Sales</TableCell>
                        <TableCell>$2,000.00</TableCell>
                        <TableCell>Market</TableCell>
                      </TableRow>
                      {/* Add more rows as needed */}
                    </TableBody>
                  </Table>
                  <Button className="mt-4">Add Income</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
          </Tabs>
  );
};

export default FinancePage;