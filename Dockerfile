FROM python:3.6 as base
WORKDIR /CommuTag
#先copy裝dependency相關的檔案，安裝完後再copy原始碼，才不用每次改原始碼重build image都要再裝一次dependency
COPY package.json package-lock.json requirements.txt ./
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -\
    && apt-get install nodejs \
    && npm install \
    && pip install -r requirements.txt
COPY . ./
CMD ["node","server.js"]
