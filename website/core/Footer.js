/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

class Footer extends React.Component {
  docUrl(doc) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    return `${baseUrl}${docsPart}${doc}`;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Documentação</h5>
            <a href={this.docUrl("intro/welcome")}>Introdução</a>
            <a href={this.docUrl("aws/aws-intro")}>AWS</a>
            <a href={this.docUrl("architecture/architecture-intro")}>
              Arquitetura
            </a>
            <a href={this.docUrl("devops/devops-intro")}>DevOps</a>
            <a href={this.docUrl("backend/backend-intro")}>Backend</a>
          </div>
          <div>
            <h5>AWS</h5>
            <a href={this.docUrl("aws/ec2/aws-ec2")}>EC2</a>
            <a href={this.docUrl("aws/ec2/aws-ebs")}>EBS</a>
            <a href={this.docUrl("aws/load-balancers/aws-alb")}>ALB</a>
            <a href={this.docUrl("aws/load-balancers/aws-nlb")}>NLB</a>
          </div>
          <div>
            <h5>Sobre</h5>
            <a
              href="https://github.com/Luiz-Silva19/luiz-tech-notes"
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
            </a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/Luiz-Silva19/luiz-tech-notes/stargazers"
              data-show-count="true"
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub"
            >
              Star
            </a>
          </div>
        </section>

        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
