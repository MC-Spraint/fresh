import { BadRequestException, Injectable } from "@nestjs/common";
import * as handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";
import { EmailTemplate } from "./email-template.enum";
import { EmailVerificationTemplate } from "./entities/email-verification-template.entity";
import { ForgotPasswordTemplate } from "./entities/forgot-password-template.entity";

@Injectable()
export class EmailTemplateService {
  private compileFile(filePath: string, variables: unknown): string {
    const expectedFileType = [".hbs"];
    if (!expectedFileType.includes(path.extname(filePath))) {
      throw new BadRequestException(`File type shoud be hbs`);
    }
    const content = fs.readFileSync(filePath, "utf8");
    const template = handlebars.compile(content);
    return template(variables);
  }
  private getRootPathOfTemplate(filename: string): string {
    const pathToTemplate = path.join(
      __dirname,
      "../../../..",
      `public/views/${filename}.hbs`,
    );
    return pathToTemplate;
  }
  private getTemplate<T>(templateName: EmailTemplate, variables: T): string {
    const pathToForgotPassTemplate = this.getRootPathOfTemplate(templateName);
    const template: string = this.compileFile(
      pathToForgotPassTemplate,
      variables,
    );
    return template;
  }

  public getForgotPasswordTemplate(variables: ForgotPasswordTemplate): string {
    const template = this.getTemplate<ForgotPasswordTemplate>(
      EmailTemplate.FORGOT_PASSWORD,
      variables,
    );
    return template;
  }
  public getEmailVerificationTemplate(
    variables: EmailVerificationTemplate,
  ): string {
    const template = this.getTemplate<EmailVerificationTemplate>(
      EmailTemplate.EMAIL_VERIFICATION,
      variables,
    );
    return template;
  }
}
