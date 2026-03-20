# Use a minimal Linux base
FROM alpine:latest
WORKDIR /app

# Copy your exact PocketBase binary (the one you run locally)
COPY pocketbase /app/pocketbase
RUN chmod +x /app/pocketbase

# Copy your existing database folder
COPY pb_data /app/pb_data

EXPOSE 8090

# Start PocketBase
CMD ["./pocketbase", "serve", "--http=0.0.0.0:$PORT", "--dir=/app/pb_data"]