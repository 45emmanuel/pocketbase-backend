FROM debian:stable-slim

WORKDIR /app

RUN apt-get update && apt-get install -y unzip wget

# Download PocketBase
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.22.0/pocketbase_0.22.0_linux_amd64.zip \
    && unzip pocketbase_0.22.0_linux_amd64.zip

EXPOSE 8080

CMD ["./pocketbase", "serve", "--http=0.0.0.0:8080"]