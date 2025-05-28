
"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UploadCloud, Download, FileText, ImageIcon, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import type { UploadedFile, UserRole } from '@/types';

interface FileManagementClientProps {
  initialFiles: UploadedFile[];
}

export default function FileManagementClient({ initialFiles }: FileManagementClientProps) {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [files, setFiles] = useState<UploadedFile[]>(initialFiles);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType') as UserRole;
    // For this demo, let's assume 'dealer' or 'admin' (if we had one) can upload.
    // To simplify, anyone can see the upload UI, but in real app it would be role-gated.
    // For now, we'll show upload for 'dealer' or if userType is not set (could be admin testing)
    setUserRole(storedUserType); 
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({ title: "No file selected", description: "Please choose a file to upload.", variant: "destructive" });
      return;
    }
    // Mock upload logic
    const newFile: UploadedFile = {
      id: `file-${Date.now()}`,
      name: selectedFile.name,
      type: selectedFile.type.startsWith('image/') ? 'image' : 'pdf',
      url: URL.createObjectURL(selectedFile), // Temporary URL for demo
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`,
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setFiles(prevFiles => [newFile, ...prevFiles]);
    setSelectedFile(null); // Reset file input
    
    // Clear the actual file input field value
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = "";

    toast({ title: "File Uploaded!", description: `${newFile.name} has been successfully uploaded (mock).` });
  };
  
  const handleDelete = (fileId: string) => {
    // Mock delete logic
    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    toast({ title: "File Deleted!", description: `File has been successfully deleted (mock).`, variant: "destructive" });
  };


  // Only 'dealer' role can see the upload section for this demo
  const canUpload = userRole === 'dealer';

  return (
    <div>
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">File Downloads</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Access important documents and images. Admins can upload new files below.
        </p>
      </section>

      {canUpload && (
        <Card className="mb-12 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <UploadCloud className="mr-2 h-6 w-6 text-primary" /> Admin File Upload
            </CardTitle>
            <CardDescription>Upload PDF files and images for users to download.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="file-upload" className="text-sm font-medium">Choose File (PDF or Image)</Label>
              <Input 
                id="file-upload" 
                type="file" 
                accept=".pdf,image/*" 
                onChange={handleFileChange} 
                className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
              {selectedFile && <p className="text-sm text-muted-foreground mt-2">Selected: {selectedFile.name}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleUpload} disabled={!selectedFile}>
              <UploadCloud className="mr-2 h-4 w-4" /> Upload File
            </Button>
          </CardFooter>
        </Card>
      )}

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Available Files</CardTitle>
          <CardDescription>Browse and download available files.</CardDescription>
        </CardHeader>
        <CardContent>
          {files.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No files available for download currently.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px] hidden sm:table-cell">Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Size</TableHead>
                  <TableHead className="hidden lg:table-cell">Uploaded</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell className="hidden sm:table-cell">
                      {file.type === 'pdf' ? 
                        <FileText className="h-6 w-6 text-red-500" /> : 
                        <ImageIcon className="h-6 w-6 text-blue-500" />
                      }
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{file.name}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{file.size}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{file.uploadedAt}</TableCell>
                    <TableCell className="text-right space-x-2">
                       <Button variant="outline" size="sm" asChild>
                        <a href={file.url} download={file.name} aria-label={`Download ${file.name}`}>
                          <Download className="mr-1 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Download</span>
                        </a>
                      </Button>
                      {canUpload && (
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(file.id)} aria-label={`Delete ${file.name}`}>
                           <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
