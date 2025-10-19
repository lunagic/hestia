curl -X POST "https://console.apps.raccoon-beta.net/api/application.deploy" \
    -H "x-api-key: LFEteMhCUWExhfbuVwZsYSaPKMmIdftvQSbJZRSHpLsaeyIXaZqcsYTFfnhYFZCg" \
    -H "Content-Type: application/json" \
    -d '{
        "applicationId": "'DOKPLOY_APP_ID'",
        "title": "Triggered byGitHub Action"
    }'
