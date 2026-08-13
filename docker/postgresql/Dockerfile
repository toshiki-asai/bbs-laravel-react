FROM postgres:18.1
LABEL maintainer="toshiki-asai <codetrain.toshiki.asai@gmail.com>"

ENV TZ=Asia/Tokyo

ARG DOCKERDIR

COPY ${DOCKERDIR}/postgresql/postgresql.conf /etc/postgresql/postgresql.conf
RUN chmod 644 /etc/postgresql/postgresql.conf
