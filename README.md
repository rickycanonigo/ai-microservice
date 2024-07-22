AutoSDR Microservice


copy .env.example to .env
```
cp .env.example .env
```


To run the server
```
npm run server
```

The server runs in port 8000 including the emailWorker
```
http://localhost:8000/api
```

This is the auto generate email endpoint
```
http://localhost:8000/api/ai/generate-email
```

Sample input data

```
{
    "leadDetails":[
          {
            "lead_company": "Example Corp",
            "lead_company_description": "We provide tech solutions.",
            "lead_name": "John Doe",
            "lead_email": "john.doe@example.com"
        }
    ]
    ,
    "persona":
    {
        "persona_description": "Friendly and Professional",
        "persona_name": "Julia Brooch",
        "persona_company": "RichBrand Dairy Products",
        "persona_services":"milks and dairy products"
    }
}
```


Make sure to enable Google API Services used in your google console project

-GMAIL API
-PEOPLE API


Additional packages:
run the command

```
npm install
```


Starting the Redis(should run in separate shell) Root Directory "auto-sdr-microservice":
```
redis-server.exe
```