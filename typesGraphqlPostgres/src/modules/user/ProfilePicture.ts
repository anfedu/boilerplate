import { Resolver, Mutation, Arg } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { createWriteStream } from "fs";

import { Upload } from "../../types/Upload";

@Resolver()
export class ProfilePictureResolver {
  @Mutation(() => Boolean)
  async addProfilePicture(
    @Arg("picture", () => GraphQLUpload)
    { createReadStream, filename }: Upload
  ): Promise<boolean> {
    const destination = createWriteStream(
      __dirname + `/../../../images/${filename}`
    );
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(destination)
        .on("finish", () => resolve(true))
        .on("error", () => reject(false))
    );
  }
}
