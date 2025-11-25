# Test Blog API Script
# This script tests the blog creation API

Write-Host "Testing Blog API..." -ForegroundColor Cyan
Write-Host ""

# Test data
$testBlog = @{
    title = "Test Blog Post from PowerShell"
    slug = "test-blog-post-powershell"
    content = "<h2>Testing the API</h2><p>This blog post was created using PowerShell to test the API endpoint.</p><h3>Features Tested</h3><ul><li>POST request</li><li>JSON parsing</li><li>File writing</li><li>Response handling</li></ul>"
} | ConvertTo-Json

Write-Host "Sending POST request to http://localhost:3000/api/blog/create" -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/blog/create" -Method Post -Body $testBlog -ContentType "application/json"
    
    Write-Host "✅ SUCCESS!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Response:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 10
    Write-Host ""
    Write-Host "Blog post created successfully!" -ForegroundColor Green
    Write-Host "View it at: http://localhost:3000/blog/$($response.post.slug)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ ERROR!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Error details:" -ForegroundColor Yellow
    Write-Host $_.Exception.Message
    Write-Host ""
    if ($_.ErrorDetails.Message) {
        Write-Host "Server response:" -ForegroundColor Yellow
        $_.ErrorDetails.Message
    }
}

Write-Host ""
Write-Host "Test complete!" -ForegroundColor Cyan
