import index from "@/index.html";
import * as fs from "fs/promises";
import z from "zod";
import { ResumeDataSchema } from "./common";
import { templates, type Template } from "./templates";

Bun.serve({
  routes: {
    //
    // HTML
    //
    "/": index,
    //
    // API
    //
    "/api/submit": {
      POST: async (params) => {
        const data = await params.json();
        const args = z
          .object({ template: z.string(), input: z.string() })
          .parse(data);

        try {
          const input_content = await fs.readFile(
            `./inputs/${args.input}`,
            "utf-8",
          );

          const json_input_data = JSON.parse(input_content);

          const parsed_input_data = ResumeDataSchema.safeParse(json_input_data);
          if (!parsed_input_data.success) {
            return Response.json({
              success: false,
              error: z.prettifyError(parsed_input_data.error),
            });
          }
          const input_data = parsed_input_data.data;

          // @ts-ignore
          const template: Template = templates[args.template];

          const latex = template(input_data);

          await fs.mkdir("./outputs", { recursive: true });
          await fs.writeFile(
            `./outputs/${args.input.replace(".json", "")}_${args.template}.tex`,
            latex,
            "utf-8",
          );

          return Response.json({
            success: true,
          });
        } catch (error: any) {
          return Response.json({
            success: false,
            message: error.message,
          });
        }
      },
    },
    "/api/templates": {
      GET: async () => {
        return Response.json({ templates: Object.keys(templates) });
      },
    },
    "/api/inputs": {
      GET: async () => {
        return Response.json({ inputs: await fs.readdir("inputs") });
      },
    },
  },
  //
  // config
  //
  hostname: "localhost",
  port: 8080,
});
