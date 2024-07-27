import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

const InvoicesPage: React.FC = () => {

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Invoices</h1>

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Upload and manage invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, PNG, JPG or GIF (MAX. 800x400px)
                </p>
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
    </div>
  );
};

export default InvoicesPage;
