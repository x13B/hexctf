# Use an official base image (e.g., Ubuntu)
FROM ubuntu:latest

# Install SSH server and other required packages
RUN apt-get update && \
    apt-get install -y openssh-server && \
    apt-get clean

# Create the missing privilege separation directory
RUN mkdir /run/sshd
# Create a user and set a password (use the USERNAME environment variable)
# docker build -t [image-name] --build-arg [arg-variable]=[value] .
ARG TEAM_ID=user
ARG PASS=pass

# Set environment variables with the values of the build arguments
ENV TEAM_ID=${TEAM_ID}
ENV PASS=${PASS}

RUN useradd -m -d /home/team-${TEAM_ID} -s /bin/bash team-${TEAM_ID} && \
    echo "team-${TEAM_ID}:${PASS}" | chpasswd

RUN echo '{hexctf-base64-is-not-encryption}' | base64 > /home/team-${TEAM_ID}/flag.txt
# Expose SSH port
EXPOSE 22

# Start SSH server on container startup
CMD ["/usr/sbin/sshd", "-D"]
