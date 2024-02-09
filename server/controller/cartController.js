const cartDb = require("../model/cartModel");
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "cart");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
  
  const upload = multer({ storage: storage }).array("images", 5);

exports.create = async (req, res) => {
    upload(req, res, async (error) => {
      if (error instanceof multer.MulterError) {
        return res.status(400).json({ error: "image error" + error });
      } else if (error) {
        return res.staus(500).json({ error: "server error" + error });
      }
  
      try {
        const requireFields = ["name", "discountPrice"];
        for (const field of requireFields) {
          if (!req.body[field]) {
            return res
              .staus(400)
              .send({ message: `Error: Missing ${field} field` });
          }
        }
        const productImages = req.files.map(file => (file.filename));
  
        const cart = new cartDb({
          ...req.body,
          images: productImages,
        });
        cart
          .save(cart)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "some error occured during adding to cart",
            });
          });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
      }
    });
  };

// find all items in cart
exports.find = (req,res) => {
    cartDb.find()
    .then (data => {
        if(!data){
            res.status(404).send({message: `cannot find products`})
        }else{
            res.send(data)
        }
    }).catch(err => {
        res.status(500).json({error: `internal servererror` + err});
    })
};

// remove item from cart
exports.remove = async (req, res) => {
    const id = req.params.id;
    cartDb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `cannot remove item with id` + id })
            }
            else {
                res.send({
                    message: "item removed successfully"
                })
            }
        }).catch(err => {
            res.status(500).send({
                message: "cannot remove item" + err
            });
        });
};


// increase cart count
exports.update = async (req, res) => {
    const id = req.params.id;
    let productImages;
    upload(req, {}, async (error) => {

        if (error instanceof multer.MulterError) {
            return res.status(400).json({ error: "image error" + error });
        } else if (error) {
            return res.status(500).json({ error: "server error" + error })
        }

        try {
            if (req.files.length > 0) {
                productImages = req.files.map(file => (file.filename));
            } else {
                const existingProduct = await cartDb.findById(id);
                if (!existingProduct) {
                    return reject({ error: " item not found" });
                }

                // Use the existing image path
                productImages = existingProduct.images.map(image => (image));

            }

            const item = await cartDb.findById(id);

            if (!item) {
                return res.status(400).send({ message: `error while updating item` });
            }
            const updatedItem = {
                ...req.body,
                images: productImages
            }
            const updated = await cartDb.findByIdAndUpdate(id, updatedItem, { new: true });
            res.status(200).json(updated);

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "server error" });
        }
    });
};