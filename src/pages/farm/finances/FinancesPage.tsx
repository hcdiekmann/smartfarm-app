import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload } from 'lucide-react';

const FinancePage = () => {
  return (
          <Tabs defaultValue="summary" className="w-full">
            <div className="flex mb-4">
              <TabsList className="grid w-[400px] grid-cols-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
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
            
            <TabsContent value="invoices" className="w-full">
              <Card>
                <CardHeader>
                  <CardTitle>Invoices</CardTitle>
                  <CardDescription>Upload and manage invoices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">PDF, PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                      <Input id="dropzone-file" type="file" className="hidden" />
                    </label>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Recent Uploads</h3>
                    <ul className="space-y-2">
                      <li>Invoice_001.pdf</li>
                      <li>Receipt_July2024.png</li>
                      {/* Add more items as needed */}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
  );
};

export default FinancePage;