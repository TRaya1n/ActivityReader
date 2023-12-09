import chalk from "chalk";
import moment from "moment";

interface LoggerOptions {
  date?: Boolean;
}

/**
 * @returns String - time
 */
function getTime() {
  return moment().utcOffset(+5).format("YYYY/MM/DD H:mm:ss");
}

export class Logger {
  constructor(options: LoggerOptions) {
    const date = options.date ? options.date : false;
  }

  /**
   * @param{string} content
   */
  public log(content: string) {
    console.warn(
      chalk.bold.green(getTime()),
      chalk.blueBright("[" + chalk.yellow("LOG") + "]"),
      chalk.cyan(content),
    );
  }

  /**
   * @param{string} content
   * @param{Error} error
   */
  public error(content: string, error: Error) {
    console.warn(
        chalk.bold.green(getTime()),
        chalk.blueBright("[" + chalk.red('ERROR') + "]"), 
        chalk.grey(content), "\n",
        chalk.red(chalk.bold.underline.yellowBright('error?.message'), error.message), '\n',
        chalk.red(chalk.bold.underline.yellowBright('error?.cause'), error?.cause || "null"), '\n',
        chalk.red(chalk.bold.underline.yellowBright('error?.stack'), error?.stack || "null"), '\n',
        chalk.yellow(error.name)
    );
  }
  
}
