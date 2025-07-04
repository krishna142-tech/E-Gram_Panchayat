Here's the corrected version of the document viewer section for both files:

For AdminDashboard.tsx and StaffDashboard.tsx, replace the document viewer section with:

```tsx
{/* Uploaded Documents */}
{selectedApplication.formData.uploadedDocuments && (
  <div>
    <h4 className="font-medium text-secondary-900 dark:text-white mb-2">Uploaded Documents</h4>
    <div className="space-y-3">
      {Object.entries(selectedApplication.formData.uploadedDocuments).map(([key, files]) => (
        <div key={key}>
          <h5 className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
            Required Document {parseInt(key.replace('document_', '')) + 1}
          </h5>
          <div className="space-y-2">
            {files.map((file: any, index: number) => (
              <DocumentViewer
                key={index}
                fileId={file.url}
                fileName={file.name}
                fileSize={file.size}
                fileType={file.type}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)}
```

This will properly display the uploaded documents using the DocumentViewer component in both the admin and staff dashboards. The code is now consistent and properly formatted.

Make sure you have imported the DocumentViewer component at the top of both files:

```tsx
import DocumentViewer from '../../components/ui/DocumentViewer';
```

This implementation:
1. Maps through all uploaded documents
2. Groups them by document type
3. Displays each document using the DocumentViewer component
4. Shows proper headings and organization
5. Maintains consistent styling across both dashboards