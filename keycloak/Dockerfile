FROM quay.io/keycloak/keycloak:26.0.0

# Set the working directory
WORKDIR /

# Copy the realm.json and entrypoint.sh files
COPY ./realm.json ./realm.json
COPY ./entrypoint.sh ./entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["entrypoint.sh"]