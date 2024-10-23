build:
	cd nestjs && npm run build
	cd nestjs && docker compose -f .docker-compose.yaml up -d --remove-orphans --force-recreate
	cd ui && npm run dev 
