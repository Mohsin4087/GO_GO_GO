class TravelWallet {
  constructor() {
      this.fileInput = document.getElementById('file-input');
      this.fileUploader = document.querySelector('.file-uploader');
      this.uploadProgress = document.getElementById('upload-progress');
      this.documentsListElement = document.getElementById('documents-list');
      this.filePreviewElement = document.getElementById('file-preview');
      
      this.allowedTypes = [
          'application/pdf', 
          'image/jpeg', 
          'image/jpg', 
          'image/png'
      ];
      
      this.initializeEventListeners();
      this.loadExistingDocuments();
  }
  
  initializeEventListeners() {
      // Click to select file
      this.fileUploader.addEventListener('click', () => this.fileInput.click());
      
      // File selected via input
      this.fileInput.addEventListener('change', (event) => this.handleFileSelection(event.target.files));
      
      // Drag and drop functionality
      this.fileUploader.addEventListener('dragover', (event) => {
          event.preventDefault();
          this.fileUploader.classList.add('dragover');
      });
      
      this.fileUploader.addEventListener('dragleave', () => {
          this.fileUploader.classList.remove('dragover');
      });
      
      this.fileUploader.addEventListener('drop', (event) => {
          event.preventDefault();
          this.fileUploader.classList.remove('dragover');
          this.handleFileSelection(event.dataTransfer.files);
      });
  }
  
  handleFileSelection(files) {
      if (files.length === 0) return;
      
      const file = files[0];
      
      // Validate file type
      if (!this.allowedTypes.includes(file.type)) {
          alert('Please select a PDF or image file (JPG, JPEG, PNG)');
          return;
      }
      
      // Display preview
      this.displayFilePreview(file);
      
      // Upload the file
      this.uploadFile(file);
  }
  
  displayFilePreview(file) {
      this.filePreviewElement.innerHTML = '';
      
      if (file.type.startsWith('image/')) {
          const img = document.createElement('img');
          img.src = URL.createObjectURL(file);
          img.style.maxWidth = '100%';
          img.style.maxHeight = '200px';
          this.filePreviewElement.appendChild(img);
      } else {
          // For PDFs show an icon or name
          const fileInfo = document.createElement('div');
          fileInfo.textContent = `Selected file: ${file.name}`;
          this.filePreviewElement.appendChild(fileInfo);
      }
  }
  
  uploadFile(file) {
      // Create progress bar
      this.uploadProgress.innerHTML = '<div class="progress-bar">0%</div>';
      const progressBar = this.uploadProgress.querySelector('.progress-bar');
      
      // In a real app, this would use fetch or XHR to upload to your server
      // For demo purposes, we'll simulate the upload
      let progress = 0;
      const interval = setInterval(() => {
          progress += 5;
          progressBar.style.width = `${progress}%`;
          progressBar.textContent = `${progress}%`;
          
          if (progress >= 100) {
              clearInterval(interval);
              this.addDocumentToList(file);
              
              // Clear the file input for future uploads
              this.fileInput.value = '';
              setTimeout(() => {
                  this.uploadProgress.innerHTML = '';
              }, 2000);
          }
      }, 200);
      
      // In a real implementation, this would be replaced with actual server upload code
  }
  
  addDocumentToList(file) {
      const documentCard = document.createElement('div');
      documentCard.className = 'document-card';
      
      // Create a unique ID for the document
      const documentId = 'doc_' + Date.now();
      documentCard.dataset.id = documentId;
      
      // Add document preview/icon
      if (file.type.startsWith('image/')) {
          const img = document.createElement('img');
          img.src = URL.createObjectURL(file);
          documentCard.appendChild(img);
      } else {
          // If PDF, show an icon or text representation
          const pdfIcon = document.createElement('div');
          pdfIcon.textContent = 'PDF';
          pdfIcon.style.padding = '10px';
          pdfIcon.style.backgroundColor = '#f0f0f0';
          documentCard.appendChild(pdfIcon);
      }
      
      // Add document info
      const docInfo = document.createElement('div');
      docInfo.className = 'document-info';
      docInfo.innerHTML = `
          <h3>Boarding Pass</h3>
          <p>Uploaded: ${new Date().toLocaleString()}</p>
          <p>File: ${file.name}</p>
      `;
      documentCard.appendChild(docInfo);
      
      // Add delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'delete-btn';
      deleteBtn.addEventListener('click', () => this.deleteDocument(documentId));
      documentCard.appendChild(deleteBtn);
      
      // Add to the documents list
      this.documentsListElement.appendChild(documentCard);
      
      // In a real app, we would save this document info to the server/database
      this.saveDocumentsToLocalStorage();
  }
  
  deleteDocument(documentId) {
      const documentCard = document.querySelector(`.document-card[data-id="${documentId}"]`);
      if (documentCard) {
          documentCard.remove();
          // In a real app, we would also delete from the server
          this.saveDocumentsToLocalStorage();
      }
  }
  
  loadExistingDocuments() {
      // In a real app, this would load documents from your server/API
      // For demo purposes, we're using localStorage
      const savedDocuments = localStorage.getItem('boardingPasses');
      if (savedDocuments) {
          this.documentsListElement.innerHTML = savedDocuments;
          
          // Reattach event listeners to delete buttons
          document.querySelectorAll('.delete-btn').forEach(btn => {
              const documentId = btn.closest('.document-card').dataset.id;
              btn.addEventListener('click', () => this.deleteDocument(documentId));
          });
      }
  }
  
  saveDocumentsToLocalStorage() {
      // In a real app, this would save to your server/database
      // For demo purposes, we're using localStorage
      localStorage.setItem('boardingPasses', this.documentsListElement.innerHTML);
  }
}

// Initialize the app when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TravelWallet();
});
