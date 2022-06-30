module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        type: String,
        title: String,
        synopsis: String,
        description: String,
        status: String,
        imgTiny: String,
        imgSmall: String,
        imgMedium: String,
        widthImgTiny: Number,
        heightImgTiny: Number,
        widthImgSmall: Number,
        heightImgSmall: Number,
        widthImgMedium: Number,
        heightImgMedium: Number,
        episodeCount: Number,
        moyenneAvis: Number,
      },
      { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const Anime = mongoose.model("anime", schema);
    return Anime;
};