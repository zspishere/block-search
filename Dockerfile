FROM nginx:1.21.1
LABEL maintainer="zspishere@163.com"

ENV PIP_INDEX_URL=https://pypi.doubanio.com/simple
ENV PYTHONUNBUFFERED=1

COPY build /usr/share/nginx/html
EXPOSE 80

ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
