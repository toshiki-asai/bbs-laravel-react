FROM nginx:1.29.3-alpine

LABEL maintainer="toshiki-asai <codetrain.toshiki.asai@gmail.com>"
SHELL ["/bin/ash", "-oeux", "pipefail", "-c"]

ARG WORKDIR_BACK \
    DOCKERDIR

ENV TZ=Asia/Tokyo

# nginx config file
COPY ${DOCKERDIR}/nginx/*.conf /etc/nginx/conf.d/

WORKDIR ${WORKDIR_BACK}
