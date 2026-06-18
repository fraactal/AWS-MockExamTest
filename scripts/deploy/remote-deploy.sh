#!/usr/bin/env bash
set -euo pipefail

: "${REMOTE_HOST:?REMOTE_HOST is required}"
: "${SSH_USER:?SSH_USER is required}"
: "${SSH_KEY_FILE:?SSH_KEY_FILE is required}"
: "${APP_ENV_FILE:?APP_ENV_FILE is required}"
: "${DEPLOY_PATH:?DEPLOY_PATH is required}"
: "${RELEASE_VERSION:?RELEASE_VERSION is required}"
: "${ARCHIVE_NAME:?ARCHIVE_NAME is required}"

REMOTE_RELEASE_PATH="${DEPLOY_PATH}/releases/${RELEASE_VERSION}"
REMOTE_SHARED_PATH="${DEPLOY_PATH}/shared"
REMOTE_CURRENT_PATH="${DEPLOY_PATH}/current"
SSH_OPTS=(-i "${SSH_KEY_FILE}" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null)

ssh "${SSH_OPTS[@]}" "${SSH_USER}@${REMOTE_HOST}" "mkdir -p '${REMOTE_RELEASE_PATH}' '${REMOTE_SHARED_PATH}/runtime-data'"
scp "${SSH_OPTS[@]}" "${ARCHIVE_NAME}" "${SSH_USER}@${REMOTE_HOST}:${REMOTE_RELEASE_PATH}/release.tgz"
scp "${SSH_OPTS[@]}" "${APP_ENV_FILE}" "${SSH_USER}@${REMOTE_HOST}:${REMOTE_RELEASE_PATH}/.env"

ssh "${SSH_OPTS[@]}" "${SSH_USER}@${REMOTE_HOST}" "
  set -euo pipefail
  cd '${REMOTE_RELEASE_PATH}'
  tar -xzf release.tgz
  rm -f release.tgz
  rm -rf runtime-data
  ln -s '${REMOTE_SHARED_PATH}/runtime-data' runtime-data
  ln -sfn '${REMOTE_RELEASE_PATH}' '${REMOTE_CURRENT_PATH}'
  cd '${REMOTE_CURRENT_PATH}'
  docker compose down || true
  docker compose up -d --build --remove-orphans
"
