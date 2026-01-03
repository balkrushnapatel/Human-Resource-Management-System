using hrms_api.Models; // Your project namespace
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Add services to the container.
builder.Services.AddControllers();

// 2. Add Database Configuration (from your image)
builder.Services.AddDbContext<HrmsDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConectionString")));

// 3. Configure OpenAPI (Swagger replacement in newer templates)
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // This maps the OpenAPI document endpoint (usually /openapi/v1.json)
    app.MapOpenApi();

    // Optional: If you want the visual Swagger UI, you may still need 
    // to add app.UseSwaggerUI() if you have the Swashbuckle package installed.
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();