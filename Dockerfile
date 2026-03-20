FROM debian:stable-slim

WORKDIR /app

RUN apt-get update && apt-get install -y unzip wget

# Download PocketBase binary
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.22.0/pocketbase_0.22.0_linux_amd64.zip \
    && unzip pocketbase_0.22.0_linux_amd64.zip \
    && chmod +x pocketbase

# Copy your local database + storage
COPY pb_data /app/pb_data

# Expose Railway port
EXPOSE 8080

# Run PocketBase using Railway dynamic port + enable CORS
CMD ["sh", "-c", "./pocketbase serve --http=0.0.0.0:$PORT --dir=/app/pb_data --cors=*"]