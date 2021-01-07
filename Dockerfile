FROM public.ecr.aws/lambda/nodejs:12
EXPOSE 3002

COPY index.js package.json src postcss.config.js /var/task/

# Install NPM dependencies for function
RUN npm install

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "app.handler" ]  
