FROM debian:stable-slim

WORKDIR /app

RUN apt-get update && apt-get install -y unzip wget

# Download PocketBase binary
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.22.0/pocketbase_0.22.0_linux_amd64.zip \
    && unzip pocketbase_0.22.0_linux_amd64.zip \
    && chmod +x pocketbase

# Copy your local DB + uploads
COPY pb_data /app/pb_data

# Expose port 8080
EXPOSE 8080

# Run PocketBase with Render dynamic port + CORS
CMD ["sh", "-c", "./pocketbase serve --http=0.0.0.0:$PORT --dir=/app/pb_data --cors=*"]