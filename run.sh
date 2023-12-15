#!/bin/bash

APP_NAME=$(node -p "require('./package.json').name")
APP_SHORT_NAME=$(node -p "require('./package.json').shorName")
CONTAINER_NAME="${APP_NAME}_container"
PACKAGE_VERSION=$(node -p "require('./package.json').version")
APP_NAME_WITH_VERSION="${APP_SHORT_NAME}-${PACKAGE_VERSION}"

# Остановка и удаление контейнера
echo "Остановка и удаление контейнера $CONTAINER_NAME..."
docker stop $CONTAINER_NAME
docker rm $CONTAINER_NAME

# Очистка рабочего каталога
rm -rf dist

# Создание Docker-образа с версией
echo "Сборка Docker-образа $APP_NAME:$PACKAGE_VERSION..."
docker build --no-cache -t $APP_NAME .

echo "Проверка на успешность сборки"
if [ $? -ne 0 ]; then
    echo "Ошибка сборки Docker-образа"
    exit 1
fi

echo "Запуск контейнера $CONTAINER_NAME..."
docker run --name $CONTAINER_NAME $APP_NAME

# Проверка на успешный запуск контейнера
if [ $? -ne 0 ]; then
    echo "Ошибка запуска контейнера"
    exit 1
fi

mkdir -p ./dist
docker cp $CONTAINER_NAME:/app/dist/$APP_NAME ./dist/$APP_NAME_WITH_VERSION

if [ $? -ne 0 ]; then
    echo "Ошибка при копировании исполняемого файла"
    exit 1
fi

# Остановка и удаление контейнера
echo "Остановка и удаление контейнера $CONTAINER_NAME..."
docker stop $CONTAINER_NAME
docker rm $CONTAINER_NAME

echo "Процесс завершен успешно!"
