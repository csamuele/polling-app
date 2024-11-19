#!/bin/bash

# Renew the certificate
certbot renew --quiet

nginx -s reload