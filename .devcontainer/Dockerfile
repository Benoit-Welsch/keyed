FROM mcr.microsoft.com/vscode/devcontainers/base:debian

ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=${USER_UID}

ENV BUN_INSTALL=/bun
RUN sudo mkdir -p ${BUN_INSTALL} \
    && curl -fsSL https://bun.sh/install | bash \
    && chown -R ${USERNAME} /bun \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - \
    && apt install -y nodejs 

ENV PATH=${BUN_INSTALL}/bin:${PATH}

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends git
