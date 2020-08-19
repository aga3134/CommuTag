FROM python:3.6
COPY . /CommuTag
WORKDIR /CommuTag
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -\
    && apt-get install nodejs \
    && npm install
RUN pip install -r requirements.txt
RUN apt install -y libgl1-mesa-glx
CMD ["node","server.js"]
